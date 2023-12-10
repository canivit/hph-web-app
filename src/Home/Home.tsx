import background from "../assets/background.jpg";
import "./Home.css";

export function Home() {
  return (
    <div className="text-center thumbnail">
      <img src={background} alt="" className="img-fluid"></img>
      <div className="title">
        <h1>Welcome to High Performance Health</h1>
        <h3>The place where the best trainers and athletes meet</h3>
      </div>
      <div className="description">
        <h5>
          High Performance Health is a platform where fitness enthusiasts can
          sign up as either trainers or athletes. Trainers can post workouts and
          athletes can rate them. This platform is designed to help trainers and
          athletes connect and improve performance.
        </h5>
      </div>
    </div>
  );
}
