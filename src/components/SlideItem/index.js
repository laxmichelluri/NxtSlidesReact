import './index.css'

const SlideItem = props => {
  const {isActiveSlide, onChangeSlideItem, slideDetails, serialNumber} = props
  const {heading, description} = slideDetails

  const handleClick = () => {
    onChangeSlideItem(serialNumber - 1)
    // console.log(id)
  }

  const slideClassName = isActiveSlide ? 'Active slide' : 'slide'

  return (
    <li
      onClick={handleClick}
      testid={`slideTab${serialNumber}`}
      className={slideClassName}
    >
      <p>{serialNumber}</p>
      <div className="slide-data">
        <h1 className="slideHeading">{heading}</h1>
        <p className="slideDescription">{description}</p>
      </div>
    </li>
  )
}

export default SlideItem
