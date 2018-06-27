class ProductList extends React.Component {

    /* constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
        this.handleProductUpVote = this.handleProductUpVote.bind(this);
    } */
    //incijaliziranje state-a 
    state = { products: [], };
    //punjenje state-a iz arraya klase Seed
    componentDidMount() {
        this.setState({ products: Seed.products })
    }
    //arrow funkcija koja se ne mora bindati u konstruktoru
    //ne mijenja state direkno već kopira postojeći array i state-a u novi i onda taj novi kopira u state objekt
    handleProductUpVote = (productId) => {
        console.log(productId + ' je izglasan. ');
        const nextProducts = this.state.products.map((product) => {
            if (product.id === productId) {
                console.log(productId + ' ima glasova: ' + (product.votes + 1));
                return Object.assign({}, product, { votes: product.votes + 1, });
            }
            else {
                return product;
            }

        }

        );
        this.setState(
            { products: nextProducts, }
        );
    }
    //render služi za kreiranje prikaza na stranici
    //ovdje se kreira prikaz Liste od n objekata klase Product
    render() {
        const products = this.state.products.sort((a, b) => (
            b.votes - a.votes
        ));
        //kreiranje objekata klase Product
        const productComponents = products.map((product) => (
            <Product
                //Ovo su sve props od producta
                key={'product-' + product.id} //ovaj key treba REactu????
                id={product.id}
                title={product.title}
                description={product.description}
                url={product.url}
                votes={product.votes}
                submitterAvatarUrl={product.submitterAvatarUrl}
                productImageUrl={product.productImageUrl}
                //ovaj prop je u stvari funkcija iz parenta tj. ProductList-a
                onVote={this.handleProductUpVote}
            />
        ));

        //ovdje ide stvarni output div tag sa listom objekata Product
        return (

            <div className='ui unstackable items'>
                {productComponents}
            </div>
        );
    }
}


class Product extends React.Component {

    constructor(props) {
        super(props);
        //this.handleUpVote = this.handleUpVote.bind(this);
    }
    // lokalna funkcija u klasi koju se poziva na klik a ona poziva funkciju iz parenta koju smo poslali kako props 
    //u parentu su svi podaci (state) i tamo se moraju ažurirati
    handleUpVote = () => {
        this.props.onVote(this.props.id);
    }

    render() {

        return (
            <div className='item'>
                <div className='image'>
                    <img src={this.props.productImageUrl} />
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <a onClick={this.handleUpVote}>
                            <i className='large caret up icon' />
                        </a>
                        {this.props.votes}
                    </div>
                    <div className='description'>
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                        <p>
                            {this.props.description}
                        </p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by:</span>
                        <img
                            className='ui avatar image'
                            src={this.props.submitterAvatarUrl}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <ProductList />,
    document.getElementById('content')
);

