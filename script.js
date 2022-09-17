const soundsSet = [
{ keyExact: 'Q',
  keyCode: 81,
  id: 'S-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{ keyExact: 'W',
  keyCode: 87,
  id: 'S-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },

{ keyExact: 'E',
  keyCode: 69,
  id: 'S-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{ keyExact: 'A',
  keyCode: 65,
  id: "S-4",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{ keyExact: 'S',
  keyCode: 83,
  id: 'S-5',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },

{ keyExact: 'D',
  keyCode: 68,
  id: 'S-6',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },

{ keyExact: 'Z',
  keyCode: 90,
  id: 'S-7',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' },

{ keyExact: 'X',
  keyCode: 88,
  id: 'S-8',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },

{ keyExact: 'C',
  keyCode: 67,
  id: 'S-9',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' }];


const setId = "Simon's soundsSet";

const activeStatus = {
  backgroundColor: '#a6a6a6',
  width: '100px',
  height: '67px',
  color: 'red' };


const inactiveStatus = {
  backgroundColor: '#ffc266',
  width: '100px',
  height: '67px' };


class DrumSingleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonSta: inactiveStatus };


    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.myButtonStyle = this.myButtonStyle.bind(this);
    this.playMyMusic = this.playMyMusic.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode == this.props.keyCode) {
      this.playMyMusic();
    }
  }

  myButtonStyle() {
    if (this.state.buttonSta.backgroundColor === '#ffc266') {
      this.setState({
        buttonSta: activeStatus });

    } else if (this.state.buttonSta.backgroundColor === "#a6a6a6") {
      this.setState({
        buttonSta: inactiveStatus });

    }
  }

  playMyMusic() {
    let currentMusic = document.getElementById(this.props.keyExact);
    currentMusic.currentTime = 0;
    currentMusic.play();

    this.props.displayUpload(this.props.soundsId.replace(/-/g, " "));

    this.myButtonStyle();
    setTimeout(() => this.myButtonStyle(), 100);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "drum-pad", id: this.props.soundsId, onClick: this.playMyMusic, style: this.state.buttonSta }, /*#__PURE__*/
      React.createElement("audio", { src: this.props.soundsURL, className: "clip", id: this.props.keyExact }),
      this.props.keyExact));


  }}
;

class DrumAllButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let drumAllButtons;
    drumAllButtons = this.props.soundsSet.map((track, i, musicArray) => {
      return /*#__PURE__*/(
        React.createElement(DrumSingleButton, {
          soundsURL: musicArray[i].url,
          soundsId: musicArray[i].id,
          keyCode: musicArray[i].keyCode,
          keyExact: musicArray[i].keyExact,
          displayUpload: this.props.displayUpload }));


    });

    return /*#__PURE__*/React.createElement("div", { className: "drumAllButtons" }, drumAllButtons);
  }}
;

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: "SIN Chun Hung",
      display: setId,
      soundsSet: soundsSet,
      myTitle: 'Simple Drum Machine' };


    this.displayUpload = this.displayUpload.bind(this);
  }

  displayUpload(name) {
    this.setState({
      display: name });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement("div", { id: "myTitle" }, /*#__PURE__*/
      React.createElement("h1", null, this.state.myTitle)), /*#__PURE__*/

      React.createElement("div", { id: "other-info-drum" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("p", { id: "author-name" }, this.state.authorName)), /*#__PURE__*/

      React.createElement("div", null, /*#__PURE__*/
      React.createElement("p", { id: "display" }, this.state.display))), /*#__PURE__*/


      React.createElement(DrumAllButtons, { displayUpload: this.displayUpload, soundsSet: this.state.soundsSet })));


  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(DrumMachine, null), document.getElementById('myDrumMachine'));