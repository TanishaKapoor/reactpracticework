import { Component } from "react";
import { connect } from "react-redux";
import React from "react";
import {addProductToCart} from "../actions";
import "../styles/ProductList.css";
import {withRouter } from "react-router-dom";
import {bindActionCreators} from "redux";
import MyContext from "../ContextAPI/MyContext";
import sort from "../images/sort.png"
import {Card,Button} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import sorry from "../images/sorry.jpg";

class ProductList extends Component{
    state={
        filter:"",
        sort:false,
        offset:0,
        perPage:4,
        currentPage:0,
    };
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            forcePage:selectedPage,
            offset: offset
        }, () => {
            this.filteredList();

        });

    };
    nextPath(isloggedIn,path,product){
        if(isloggedIn){
            this.props.addProductToCart(product);
            window.alert("Product added to cart")
            this.props.history.push(path);
        }
        else{
            window.alert("Oopsie...!! Login Required..!!");
            this.props.history.push('/login');
        }
    }
    productDetailPage(product){
        this.props.history.push({
            pathname:'/product_detail',
            productDetail:product
        })
    }

    setSort(){
        this.setState(prevState => ({
            filter:prevState.filter,
            sort: !prevState.sort
        }))}
        setStateOfFilters(event){
            this.setState({
                filter:event.target.value,
                offset:0,
                forcePage:0
            })
        }

    sortedList(){
        (this.state.sort === false? 
            this.props.products.sort((a, b) => (a.price) - (b.price)):this.props.products.sort((a, b) => (b.price) - (a.price)))
        return this.props.products;
    }
    pageCountSet(){
        this.setState({
            pageCount: Math.ceil(this.filteredList().length / this.state.perPage)
        })
    }
    filteredList(){
      return this.sortedList().filter(product => product.deviceName.toLowerCase().includes(this.state.filter.toLowerCase())).slice(this.state.offset, this.state.offset + this.state.perPage);
    }
    render(){
        return(
            <MyContext.Consumer>
                {context=>(
            <div>
            <h1>MOBILES LIST</h1>
            <div className="search_bar">
            <input className="searchbox" type="text" placeholder="Search by name" onChange={event=>this.setStateOfFilters(event)}></input>
            <Button variant="success" onClick={()=>this.setSort()}>Sort Price
            <img  alt="" src={sort}/>
            </Button>
            </div>
            {this.filteredList().length >0?
                        <div>
                        {
                        this.filteredList()
                        .map(product=>{
                            
                           return(
                                <Card  className="card-change" style={{ width: '18rem' }} key={product.id}>
                                <Card.Img variant="top" src={require(`../images/${product.img}`)} />
                                <Card.Body>
                                    <Card.Title>{product.deviceName.toUpperCase()}</Card.Title>
                                    <Card.Text className="text-align">
                                                <span className="heading-text">Device Camera :</span>
                                                <span>{product.camera}</span>
                                    </Card.Text>
                                    <Card.Text className="text-align">
                                                <span className="heading-text">Device Price:</span>
                                                <span> $ {product.price}</span>  
                                    </Card.Text>
                                    <Button className="button-style" onClick={()=>{this.productDetailPage(product)}}>View</Button>
                                    <Button variant="warning" onClick={()=>this.nextPath(context.state.isloggedIn,'/cart_detail',product)}>Add To Cart</Button>
                                </Card.Body>
                                </Card>
                                
                            )
                        })
                        
                        }
                              
                    </div>
                    :
                     <div style={{fontWeight:'bolder', color:'red'}}>
                    Sorry...!! We dont have any more product...!!!
                    <div><img alt="sorry" src={sorry}/></div>
                    </div>
             }
             <div className="pagination-margin">
             <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            forcePage={this.state.forcePage}
                            pageCount={this.props.products.length/this.state.perPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            />
            </div>
            </div>
            )}
        </MyContext.Consumer>
        );
    }
}
function mapStateToProps(state){
    return{
        products:state.products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addProductToCart }, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (ProductList));