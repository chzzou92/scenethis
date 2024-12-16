import PropTypes from 'prop-types'

function ShoppingCart({showSelect, setShowSelect, movies, fadeOut}) {

    return (
        <span className={`shopping-cart ${fadeOut ? "fade-out" : "fade-in-up"}`} onClick={() => {
            setShowSelect(!showSelect);
          }}>
            <svg
            id="expandable-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              fill="currentColor"
              className="bi bi-circle-fill"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="4"/>
              <text x="50%" y="50%" textAnchor="middle" stroke="#ffffff" strokeWidth={movies.length >= 10 ? "0.4px" : "0.5px"} dy="0.35em" fontSize={movies.length >= 10 ? "0.3em" : "0.4em"}>{movies.length}</text>
            </svg>
            <svg
              id="expandable-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-basket2"
              viewBox="0 0 16 16"
            >
              <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
            </svg>
          </span>
    );
}

ShoppingCart.propTypes = {
    showSelect: PropTypes.bool.isRequired,
    setShowSelect: PropTypes.func.isRequired,
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    fadeOut: PropTypes.bool.isRequired
}

export default ShoppingCart