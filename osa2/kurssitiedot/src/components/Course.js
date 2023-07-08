const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}
const Header = ({ course }) => {
    return (
        <h1> {course.name}</h1>
    )
}
const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} part={part} />)}
        </>
    )
}
const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
const Total = ({ parts }) => {
    return (
        <p><b>Total of {parts.reduce((sum, part) =>
            sum + part.exercises, 0)} exercises
        </b></p>
    )
}

export default Course