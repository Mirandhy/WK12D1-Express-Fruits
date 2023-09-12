const React = require('react');

// Create Default Layout for h1 tag (replacing div)
class DefaultLayout extends React.Component {
  render( ) {
    return (
        <html>
            <head>
                <link rel="stylesheet" href="/css/app.css" />
                <title>{ this.props.title }</title></head>
            <body>
                <h1>{ this.props.title }</h1>
                {this.props.children}
            </body>
        </html>
      
    )
  }
}

module.exports = DefaultLayout;