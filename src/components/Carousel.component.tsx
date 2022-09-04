import { Component, MouseEvent } from "react";

type StateType = {
  active: number;
};

type PropsType = {
  images: string[];
};

class Carousel extends Component<PropsType> {
  state: StateType = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleClick = (event: MouseEvent<HTMLElement>) => {
    // write it as arrow function to be able to access THIS - otherwise we will need to use the constructor to bind the function
    if (!event.currentTarget.dataset.index) return;
    this.setState({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      active: +event.currentTarget.dataset.index, // using the "+" to turn the index into a number because we are getting it from the DOM as string
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" data-testid="hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleClick}
              data-index={index} // index is number here
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              data-testid={`thumbnail${index}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
