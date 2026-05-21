import { Link } from 'react-router-dom';

function FeatureCard({ title, description, features, link, buttonText }) {
    return (
        <div className='feature-card'>
            <h2 className='feature-card-title'>{title}</h2>

            <p className='feature-card-description'>{description}</p>

            <ul className='feature-card-list'>
                {features.map((feature, index) => (
                    <li key={index} className='feature-card-item'>
                        • {feature}
                    </li>
                ))}
            </ul>

            <Link to={link} className='feature-card-button'>
                {buttonText}
            </Link>
        </div>
    );
}

export default FeatureCard;