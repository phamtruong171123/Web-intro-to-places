
import ProminentLocation from "./ProminentLocation/ProminentLocation";
import SliderLocation from "./SliderLocation/SliderLocation";


const Home = () => {

    return (
        <div className="home-container">
            <div className="slider-location">
                <SliderLocation />
            </div>
            <div className="prominent-location">
                <ProminentLocation/>
            </div>
        </div>
    )
}

export default Home;