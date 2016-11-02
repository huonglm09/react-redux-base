// both
import React, { Component } from 'react'
// normal
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
// css
import './social.scss'

class Social extends Component {
    render() {
        return (
            <div className="socials">
                <IconButton className="social-face" tooltip="Facebook" tooltipPosition="top-center">
                    <FontIcon className="fa fa-facebook" color='#FFFFFF' hoverColor='#5D8AC3' />
                </IconButton>
                <IconButton className="social-twitter" tooltip="Twitter" tooltipPosition="top-center">
                    <FontIcon className="fa fa-twitter" color='#FFFFFF' hoverColor='#39A7DE' />
                </IconButton>
                <IconButton className="social-youtube" tooltip="Youtube" tooltipPosition="top-center">
                    <FontIcon className="fa fa-youtube-play" color='#FFFFFF' hoverColor='#CC2B27' />
                </IconButton>
                <IconButton className="social-google" tooltip="Google Plus" tooltipPosition="top-center">
                    <FontIcon className="fa fa-google-plus" color='#FFFFFF' hoverColor='#DD4B38' />
                </IconButton>
                <IconButton className="social-linkedin" tooltip="Linkedin" tooltipPosition="top-center">
                    <FontIcon className="fa fa-linkedin" color='#FFFFFF' hoverColor='#0077B5' />
                </IconButton>
            </div>
        )
    }
}

export default Social
