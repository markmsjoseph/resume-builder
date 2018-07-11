import React from 'react';
import { Meteor } from 'meteor/meteor';
import { SketchPicker } from 'react-color';
import FontPicker from 'font-picker-react';
import Slider from 'react-rangeslider';


export default class H1Component extends React.Component {

    constructor (props, context) {
        super(props, context)
            this.state = {
                background: '#000000',
                activeFont: 'Open Sans',
                value: 10,
                isBold:"normal",
                isItalic:"normal",
                isUnderline:"none"
            };
    }


    //set the state of current size from slider
    handleFontSizeChange = (value) => {
      this.setState({
        value: value
      })
    };


    //set the state of current color from picker
    handleColorChange = (color) => {
       this.setState({ background: color.hex });
     };


    //uses google api to set font family styles
    handleFontFamilyChange = (nextFont) =>{
      this.setState({ activeFont: nextFont.family })
    }


    //toggle bwtewwn fontweight bold and normal
    makeFontBold = ()=>{
      if(this.state.isBold == "normal"){
        this.setState({isBold:"bold"})
      }
      else{
        this.setState({isBold:"normal"})
      }

    }


    //toggle the text fontstyle property
    makeTextItalic = ()=>{
      if(this.state.isItalic == "normal"){
        this.setState({isItalic:"italic"})
      }
      else{
        this.setState({isItalic:"normal"})
      }

    }


    //toggle the text tecoration property
    makeTextUnderline = ()=>{
      console.log("UNDERLINE",this.state.isUnderline);
      if(this.state.isUnderline == "none"){
        this.setState({isUnderline:"underline"})
      }
      else{
        this.setState({isUnderline:"none"})
      }

    }


   render() {

               const style = {
                 color: this.state.background,
                 fontFamily:this.state.activeFont,
                 fontSize: this.state.value,
                 fontWeight:this.state.isBold,
                 fontStyle: this.state.isItalic,
                 textDecoration: this.state.isUnderline
               }

               return (
                         <div className="h1Component-Container">

                                    <div className="h1Component-wrapper">
                                             <h3> Color</h3>
                                             <SketchPicker
                                               color={ this.state.background }
                                               onChangeComplete={ this.handleColorChange }
                                             />
                                    </div>

                                    <div className="h1Component-wrapper">
                                             <h3>Font Family</h3>
                                             <FontPicker
                                               apiKey="MY API KEY"
                                               activeFont={this.state.activeFont}
                                               onChange={this.handleFontFamilyChange}
                                             />
                                  </div>

                                  <div className="h1Component-wrapper">
                                             <h3>Font Size</h3>
                                             <Slider min={0}
                                               max={100}
                                               value={this.state.value}
                                               onChange={this.handleFontSizeChange}
                                             />
                                             <div className='value'>{this.state.value}</div>
                                  </div>

                                  <div className="h1Component-wrapper">
                                           <button className = "h1Component-button" onClick={this.makeFontBold}>Bold </button>
                                           <button className = "h1Component-button" onClick={this.makeTextItalic}>Italic </button>
                                           <button className = "h1Component-button" onClick={this.makeTextUnderline}>Underline </button>
                                  </div>


                                   <p style={style}>
                                     Styles will be applied to this text.
                                   </p>

                         </div>
               );
   }//end render


  }
