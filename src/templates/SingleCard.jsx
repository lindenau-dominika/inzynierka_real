export const SingleCard = (props) => {
    return (
      <div className='map-container'>
        <div>
          <img className="collage-img" src={props.image} alt='ok' />
          <h4>{props.map_name}</h4>
          <h4 className='text'>{props.score}</h4>
        </div>
      </div>
    );
  };

  export default SingleCard;