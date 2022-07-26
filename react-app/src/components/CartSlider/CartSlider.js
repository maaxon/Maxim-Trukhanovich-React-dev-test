import React, {Component} from "react";
import classes from './cartSlider.module.scss'
import arrowRight from '../../images/arrowRight.png'
import arrowLeft from '../../images/arrowLeft.png'

export default class CartSlider extends Component{

    constructor(props) {
        super(props);
        this.state ={img:''}
    }

    componentDidMount() {
        this.setState({img:this.props.gallery[0]})
    }

    nextSlide=()=>{
        const position = this.props.gallery.indexOf(this.state.img)
        if (position + 1 < this.props.gallery.length) this.setState({img:this.props.gallery[position+1]})
    }

    prevSlide=()=>{
        const position = this.props.gallery.indexOf(this.state.img)
        if (position-1 > -1) this.setState({img:this.props.gallery[position-1]})
    }

    render() {
        const sm = this.props.sm

        if (this.props.gallery.length >1){
            return(
                <div className={classes.wrapper}>
                    <img src={this.state.img} alt={"cartSlide"}/>
                    <span onClick={this.prevSlide}><img src={arrowLeft} alt={"arrowLeft"}/></span>
                    <span onClick={this.nextSlide}><img src={arrowRight} alt={"arrowRight"}/></span>
                </div>
            )
        }

        return <img className={`${classes.singleSlide} ${sm && classes.sm}`} src={this.props.gallery[0]} alt={"cartSlide"}/>
    }
}