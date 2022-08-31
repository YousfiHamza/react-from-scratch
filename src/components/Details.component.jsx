import { Component } from "react";
import { useParams } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

import Carousel from "./Carousel.component";
import ErrorBoundary from "./ErrorBoundary.component.";
import Modal from "./Modal";

class Details extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { loading: false };
  // }
  // we can get rid of the constructor because of the plugin we added to .babelrc

  state = { loading: false, showModal: false };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`);
    const json = await res.json();

    this.setState({ loading: false, ...json.pets[0] });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

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

    const { animal, breed, city, state, description, name, images, showModal } = this.state;

    return (
      <ThemeContext.Consumer>
        {([theme]) => (
          <div className="details">
            <Carousel images={images} />
            <div>
              <h1>{name}</h1>
              <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
              <button onClick={this.toggleModal} style={{ background: theme }}>
                Adopt {name}
              </button>
              <p>{description}</p>
              {showModal && (
                <Modal>
                  <div>
                    <h1>Would you like to adopt {name}?</h1>
                    <div className="buttons">
                      <a href="https://bit.ly/pet-adopt">Yes</a>
                      <button onClick={this.toggleModal}>No</button>
                    </div>
                  </div>
                </Modal>
              )}
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
