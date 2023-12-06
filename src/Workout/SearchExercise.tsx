import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Exercise } from "./types";
import { searchExercise } from "./client";

export function SearchExercise({
  addExerciseHandler,
}: {
  addExerciseHandler: (exercise: Exercise) => void;
}) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function searchHandler(exerciseName: string) {
    setExercises(await searchExercise(exerciseName));
  }

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchHandler={searchHandler}
      />
      <ExerciseList
        exercises={exercises}
        addExerciseHandler={addExerciseHandler}
      />
    </div>
  );
}

function SearchBar({
  searchTerm,
  setSearchTerm,
  searchHandler,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  searchHandler: (exerciseName: string) => void;
}) {
  return (
    <div className="d-flex mb-3">
      <input
        type="text"
        className="form-control me-3"
        id="titleInput"
        placeholder="Search for an exercise"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => searchHandler(searchTerm)}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}

function ExerciseList({
  exercises,
  addExerciseHandler,
}: {
  exercises: Exercise[];
  addExerciseHandler: (exercise: Exercise) => void;
}) {
  return (
    <Accordion defaultActiveKey="-1">
      {exercises.map((exercise, idx) => (
        <ExerciseItem
          exercise={exercise}
          exerciseIdx={idx}
          addExerciseHandler={addExerciseHandler}
          key={idx}
        />
      ))}
    </Accordion>
  );
}

function ExerciseItem({
  exercise,
  exerciseIdx,
  addExerciseHandler,
}: {
  exercise: Exercise;
  exerciseIdx: number;
  addExerciseHandler: (exercise: Exercise) => void;
}) {
  return (
    <Accordion.Item eventKey={exerciseIdx.toString()}>
      <Accordion.Header>
        <button
          className="btn btn-outline-success me-3"
          onClick={(e) => {
            e.stopPropagation();
            addExerciseHandler(exercise);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {exercise.name}
      </Accordion.Header>
      <Accordion.Body>
        <p>
          <strong>Target Muscle:</strong> {exercise.targetMuscle}
        </p>
        <p>
          <strong>Equipment:</strong> {exercise.equipment}
        </p>
        <img src={exercise.gifUrl} />
      </Accordion.Body>
    </Accordion.Item>
  );
}

