import React from 'react';
import cartaz from "../../imgs/cartaz.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1
    };
  }

  handleMouseOver = () => {
    this.setState({ opacity: 0 });
  }

  handleMouseOut = () => {
    this.setState({ opacity: 1 });
  }

  render() {
    return (
      <header>
        <h1>Festival Vilar de Mouros 2025</h1>
        <img
          id="cartaz"
          src={cartaz}
          alt="Imagem do Festival Vilar de Mouros"
          style={{ opacity: this.state.opacity, transition: "opacity 0.4s ease" }}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
      </header>
    );
  }
}

export default Header; 