import { Component } from "react";
import { useParams } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

import Carousel from "./Carousel.component";
import ErrorBoundary from "./ErrorBoundary.component.";

class Details extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { loading: false };
  // }
  // we can get rid of the constructor because of the plugin we added to .babelrc

  state = { loading: false };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`);
    const json = await res.json();

    this.setState({ loading: false, ...json.pets[0] });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="details">
          <div>
            <h2>loading … </h2>
          </div>
        </div>
      );
    }

    const { animal, breed, city, state, description, name, images } = this.state;

    return (
      <ThemeContext.Consumer>
        {([theme]) => (
          <div className="details">
            <Carousel images={images} />
            <div>
              <h1>{name}</h1>
              <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
              <button style={{ background: theme }}>Adopt {name}</button>
              <p>{description}</p>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  // const [theme] = useContext(ThemeContext); and pass theme as a prop to Details, better than using ThemeContext Consumer and the fct inside
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
