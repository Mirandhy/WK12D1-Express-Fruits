const React = require('react')

class Show extends React.Component {
    render() {

        const { name, color, readyToEat, img } = this.props.vegetable

        return (
            <div>
                <h1> Show Page </h1>
                The {name} is {color}.
                And {
                    readyToEat ?
                        "It is ready to eat!"
                        :
                        "It is not ready to eat... Cant touch this"
                }
                <img src={img} alt="" />
                <nav>
                    <a href="/vegetables">Back to Vegetables Index Page</a>
                </nav>
            </div>
        );
    }
}
module.exports = Show;