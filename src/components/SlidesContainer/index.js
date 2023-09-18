import {Component} from 'react'
import {v4} from 'uuid'
import SlideItem from '../SlideItem'
import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class SlidesContainer extends Component {
  state = {
    slidesList: initialSlidesList,
    activeSlide: initialSlidesList[0],
    isInputHeadingActive: false,
    isInputDescriptionActive: false,
  }

  onChangeSlide = index => {
    const {slidesList} = this.state

    this.setState({
      activeSlide: slidesList[index],
    })
  }

  onChangeHeading = event => {
    const {activeSlide} = this.state
    this.setState(prevState => ({
      activeSlide: {...prevState.activeSlide, heading: event.target.value},
      slidesList: [
        ...prevState.slidesList.map(eachSlide => {
          if (eachSlide.id === activeSlide.id) {
            return {...eachSlide, heading: event.target.value}
          }
          return eachSlide
        }),
      ],
    }))
  }

  changeActiveHeading = () => {
    const {isInputHeadingActive} = this.state
    this.setState({isInputHeadingActive: !isInputHeadingActive})
  }

  blurActiveHeading = event => {
    const {isInputHeadingActive, activeSlide} = this.state
    if (event.target.value === '') {
      this.setState({activeSlide})
    }
    this.setState({isInputHeadingActive: !isInputHeadingActive})
  }

  onChangeDescription = event => {
    const {isInputDescriptionActive, activeSlide} = this.state
    this.setState({
      activeSlide: {...activeSlide, description: event.target.value},
      slidesList: [
        ...slidesList.map(eachSlide => {
          if (eachSlide.id === activeSlide.id) {
            return {...eachSlide, description: event.target.value}
          }
          return eachSlide
        }),
      ],
    })
  }

  changeActiveDescription = () => {
    const {isInputDescriptionActive} = this.state
    this.setState({isInputDescriptionActive: !isInputDescriptionActive})
  }

  blurActiveDescription = event => {
    const {isInputDescriptionActive, activeSlide} = this.state
    if (event.target.value === '') {
      this.setState({activeSlide})
    }
    this.setState({isInputDescriptionActive: !isInputDescriptionActive})
  }

  addNewItemSlide = () => {
    const {slidesList, activeSlide} = this.state
    console.log(slidesList.indexOf(activeSlide))

    const activeIndex = slidesList.findIndex(eachList => {
      if (eachList.id === activeSlide.id) {
        return true
      }
      return false
    })

    const newItem = {
      id: v4(),
      heading: 'Heading',
      description: 'Description',
    }
    const insert = () => [
      ...slidesList.slice(0, activeIndex + 1),
      newItem,
      ...slidesList.slice(activeIndex + 1),
    ]

    const newList = insert()
    this.setState({slidesList: newList, activeSlide: newItem})
  }

  render() {
    const {
      activeSlide,
      isInputHeadingActive,
      isInputDescriptionActive,
      slidesList,
    } = this.state
    const activeIndex = slidesList.findIndex(eachList => {
      if (eachList.id === activeSlide.id) {
        return true
      }
      return false
    })
    console.log(activeIndex)
    const {heading, description} = activeSlide
    return (
      <div className="slides-container">
        <button
          onClick={this.addNewItemSlide}
          className="addButton"
          type="button"
        >
          <img
            className="plus"
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
          />
          New
        </button>
        <div className="slides-card-container">
          <ul className="slides-list">
            {slidesList.map((eachSlide, index) => (
              <SlideItem
                serialNumber={index + 1}
                key={eachSlide.id}
                slideDetails={eachSlide}
                isActiveSlide={eachSlide.id === activeSlide.id}
                onChangeSlideItem={this.onChangeSlide}
              />
            ))}
          </ul>
          <div className="slide-img-container">
            {isInputHeadingActive ? (
              <input
                type="text"
                className="cardHeading active-input"
                onChange={this.onChangeHeading}
                value={heading}
                onBlur={this.blurActiveHeading}
              />
            ) : (
              <h1 className="cardHeading" onClick={this.changeActiveHeading}>
                {heading}
              </h1>
            )}
            {isInputDescriptionActive ? (
              <input
                type="text"
                className="cardText active-input"
                onChange={this.onChangeDescription}
                value={description}
                onBlur={this.blurActiveDescription}
              />
            ) : (
              <p className="cardText" onClick={this.changeActiveDescription}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default SlidesContainer
