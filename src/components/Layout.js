import React from "react"
import Helmet from 'react-helmet'

import '../assets/scss/all.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <Helmet>
          <html lang="en" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        <main className="section-container">{children}</main>
      </div>
    )
  }
}

export default Layout
