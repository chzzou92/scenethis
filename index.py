from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd 
import numpy as np 


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


df1=pd.read_csv('tmdb_5000_credits.csv')
df2=pd.read_csv('tmdb_5000_movies.csv')

df1.columns = ['id','tittle','cast','crew']
df2= df2.merge(df1,on='id')

usedMovies = []
#Import TfIdfVectorizer from scikit-learn
from sklearn.feature_extraction.text import TfidfVectorizer

#Define a TF-IDF Vectorizer Object. Remove all english stop words such as 'the', 'a'
tfidf = TfidfVectorizer(stop_words='english')

#Replace NaN with an empty string
df2['overview'] = df2['overview'].fillna('')

#Construct the required TF-IDF matrix by fitting and transforming the data
tfidf_matrix = tfidf.fit_transform(df2['overview'])

#Output the shape of tfidf_matrix
tfidf_matrix.shape

# Import linear_kernel
from sklearn.metrics.pairwise import linear_kernel

# Compute the cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

#Construct a reverse map of indices and movie titles
indices = pd.Series(df2.index, index=df2['title']).drop_duplicates()

def resetRecommendations():
    global usedMovies
    usedMovies = []
    print(usedMovies)

# Function that takes in movie title as input and outputs most similar movies
def get_recommendations(title, cosine_sim=cosine_sim, declined=False):
    try:
        if title not in indices:
            return "Movie not found in dataset"  # Return a message or handle the error as you like
        
        # Get the index of the movie that matches the title
        idx = indices[title]

        # Get the pairwsie similarity scores of all movies with that movie
        sim_scores = list(enumerate(cosine_sim[idx]))

        # Sort the movies based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Get the scores of the 10 most similar movies
        sim_scores = sim_scores[1:10] 
        global usedMovies
        # Get the movie indices
        '''for i in range(len(sim_scores)):
            if sim_scores[i] not in usedMovies:
                movie_indices = sim_scores[i]
            else:
                usedMovies.append(sim_scores[i])
        
        
        # Return the top 10 most similar movies'''
        movie_indices = [i[0] for i in sim_scores]
        stop = False

        for i in range(len(movie_indices)):
            if str(df2['title'][movie_indices[i]]) not in usedMovies:
                movieIndex = movie_indices[i]
                usedMovies.append(str(df2['title'][movieIndex]))
                print(usedMovies)
                break
                
                    
        return str(df2['title'][movieIndex])
    except KeyError as e:
            print(f"KeyError: {e}")
            return "Error: Movie title not found"
    except Exception as e:
        print(f"Unexpected error: {e}")
        return "An unexpected error occurred"

def get_declined_recommendations(title, cosine_sim=cosine_sim, declined=False):
    try:
        if title not in indices:
            return "Movie not found in dataset"  # Return a message or handle the error as you like
        
        # Get the index of the movie that matches the title
        idx = indices[title]

        # Get the pairwsie similarity scores of all movies with that movie
        sim_scores = list(enumerate(cosine_sim[idx]))

        # Sort the movies based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Get the scores of the 10 most similar movies
        sim_scores = sim_scores[1:10] 
        global usedMovies
        #print(sim_scores)
        # Get the movie indices
        '''for i in range(len(sim_scores)):
            if sim_scores[i] not in usedMovies:
                movie_indices = sim_scores[i]
            else:
                usedMovies.append(sim_scores[i])
        
        
        # Return the top 10 most similar movies'''
        movie_indices = [i[0] for i in sim_scores]
    
        stop = False 

        for i in range(len(movie_indices)-1,-1,-1):
            if str(df2['title'][movie_indices[i]]) not in usedMovies:
                movieIndex = movie_indices[i]
                usedMovies.append(str(df2['title'][movieIndex]))
                print(usedMovies)
                break
                
                    
        return str(df2['title'][movieIndex])
    except KeyError as e:
            print(f"KeyError: {e}")
            return "Error: Movie title not found"
    except Exception as e:
        print(f"Unexpected error: {e}")
        return "An unexpected error occurred"


@app.route('/r', methods=['GET'])
@cross_origin()
def run_python():
    movie = request.args.get("movie")
    recommendation_type = request.args.get("type")

    if recommendation_type == "GETDECLINED":
        # Call getDeclinedRecommendations if 'GETDECLINED' is passed
        response_data = get_declined_recommendations(movie)
    else:
        # Default to get_recommendations
        response_data = get_recommendations(movie)

    
    response = response_data
    return response

@app.route('/r', methods=['DELETE'])
@cross_origin()
def reset():
    resetRecommendations()

    return usedMovies
    
    #return result
if __name__ == "__main__":
    app.run(debug=True)