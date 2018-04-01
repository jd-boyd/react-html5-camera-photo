import React from 'react';
import PropTypes from 'prop-types';

import CameraHelper from '../../CameraHelper';
import CircleButton from './CircleButton';
import Image from './Image';

import './styles/cameraMobileStyle.css';

/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/
export default class Camera extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.cameraHelper = null;
    this.state = {
      dataUri : "",
      isShowVideo: true
    };
  }

  componentDidMount() {
    this.cameraHelper = new CameraHelper(this.refs.video, this.props.autoPlay);
    this.cameraHelper.enumerateDevice()
      .catch((error)=>{
        this.props.onCameraError(error);
      });
  }

  /*
   * Public fct accessed by ref
   */
  playFirstDevice = () => {
    this.cameraHelper.playFirstDevice()
      .then(()=>{
        this.props.onCameraStart();
      })
      .catch((error)=>{
        this.props.onCameraError(error);
      });
  }

  playLastDevice = () => {
    this.cameraHelper.playLastDevice()
      .then(()=>{
        this.props.onCameraStart();
      })
      .catch((error) => {
        this.props.onCameraError(error);
      });
  }

  getDataUri = (sizeFactor) => {
    return this.cameraHelper.getDataUri(sizeFactor);
  }

  stopStreams = () => {
    this.cameraHelper.stopStreams()
      .then(() => {
        this.props.onCameraStop();
      })
      .catch((error) => {
          console.log(error);
      });
  }

  getShowHideStyle(isDisplay) {
    let displayStyle = isDisplay
      ? {display: 'inline-block'}
      : {display: 'none'}

    return displayStyle;
  }

  render() {
    let showVideoStyle = this.getShowHideStyle(this.state.isShowVideo);
    let showImgStyle = this.getShowHideStyle(!this.state.isShowVideo);

    const doTransition = this.state.isShowVideo ? '' : 'dotransition';
    const classes = `${doTransition} normal`;

    return (
      <div className="camera-mobile-style">
        <div className={classes}>
        </div>
        <img
          style = {showImgStyle}
          alt="camera"
          src={this.state.dataUri}
        />
        <video
          style = {showVideoStyle}
          ref="video"
          autoPlay="true"
        />
        <CircleButton
          onClick={()=>{
            this.props.onTakePhoto();
            let dataUri = this.cameraHelper.getDataUri();
            this.setState({
              dataUri,
              isShowVideo: false
            });
            setTimeout(()=>{
              this.setState({
                isShowVideo: true
              });
            }, 900)
          }}
        />
      </div>
    );
  }
}

Camera.propTypes = {
  onCameraError: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func,
  onTakePhoto: PropTypes.func
}