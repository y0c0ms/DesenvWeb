import React from 'react';

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        slideIndex: (prevState.slideIndex + 1) % this.props.images.length
      }));
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div id="slideshow">
        {this.props.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            style={{
              display: i === this.state.slideIndex ? "block" : "none",
              width: "100%",
            }}
          />
        ))}
      </div>
    );
  }
}

export default Slideshow; 