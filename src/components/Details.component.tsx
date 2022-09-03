import { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { StateType } from "../redux/store";
import { PetAPIResponse, Animal } from "../types/responsesType";

import Carousel from "./Carousel.component";
import ErrorBoundary from "./ErrorBoundary.component.";

const Modal = lazy(() => import("./Modal"));

type PropsType = {
  theme: string;
  params: {
    id?: string;
  };
};

class Details extends Component<PropsType> {
  // constructor(props) {
  //   super(props);

  //   this.state = { loading: false };
  // }
  // we can get rid of the constructor because of the plugin we added to .babelrc

  state = {
    loading: true,
    showModal: false,
    animal: "" as Animal,
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${this.props.params.id || ""}`);
    const json = (await res.json()) as PetAPIResponse;

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
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button onClick={this.toggleModal} style={{ background: this.props.theme }}>
            Adopt {name}
          </button>
          <p>{description}</p>
          <Suspense fallback={<h1>Loading state suspense !</h1>}>
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
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ theme }: StateType) => ({ theme });

const ReduxWrappedDetials = connect(mapStateToProps)(Details); // the hard and old way xD

const WrappedDetails = () => {
  const params = useParams<{ id: string }>();
  // const theme = useSelector((state: StateType) => state.theme); pass it in props
  // const [theme] = useContext(ThemeContext); and pass theme as a prop to Details, better than using ThemeContext Consumer and the fct inside
  return (
    <ErrorBoundary>
      <ReduxWrappedDetials params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
