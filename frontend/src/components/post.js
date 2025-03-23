import { Link } from 'react-router-dom';

export default function post({ post }) {
    return (
        <div className="card mb-4">
            <div className="row">
                <div className="col-sm-12 col-md-3">
                    <img className="img-fluid h-100 card-img-top" src={post.image} alt="..." />
                </div>
                <div className="card-body col-md-8">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">View details about your Nest</p>
                    {/* Corrected Link with template literal */}
                    <Link to={`/posts/${post._id}`} className="btn btn-primary">
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}
