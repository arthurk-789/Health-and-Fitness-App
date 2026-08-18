import FeatureCard from '../components/FeatureCard';

function Home() {
    return (
        <div className='home-container'>
            <div className='home-content'>

                <div className='home-hero'>
                    <h1 className='home-title'>
                        Health & Fitness Dashboard
                    </h1>

                    <p className='home-subtitle'>
                        Choose a tool to explore nutrition data, calculate macros,
                        estimate calories burned, and manage your fitness goals.
                    </p>
                </div>

                <div className='home-grid'>

                    <FeatureCard
                        title='Nutrition Lookup'
                        description='Search foods and view nutritional information through a backend-powered lookup tool.'
                        features={[
                            'Search food items',
                            'View calories and macros',
                            'Dynamic nutrition results'
                        ]}
                        link='/nutrition'
                        buttonText='Open Nutrition Lookup'
                    />

                    <FeatureCard
                        title='Macro Calculator'
                        description='Calculate calorie and macronutrient targets based on personal fitness goals.'
                        features={[
                            'Enter age, weight, and height',
                            'Select activity level',
                            'Choose cut, maintain, or bulk',
                            'View macro breakdown'
                        ]}
                        link='/macros'
                        buttonText='Open Macro Calculator'
                    />

                    <FeatureCard
                        title='Meal Builder'
                        description='Create meals by combining foods and tracking nutrition totals in one place.'
                        features={[
                            'Add foods to a meal',
                            'Review nutrition totals',
                            'Plan meals around your goals'
                        ]}
                        link='/meal-builder'
                        buttonText='Open Meal Builder'
                    />

                    <FeatureCard
                        title='Calories Burned'
                        description='Estimate calories burned for an activity using optional weight and duration details.'
                        features={[
                            'Search by activity',
                            'Add optional weight and duration',
                            'Compare calorie estimates'
                        ]}
                        link='/calories-burned'
                        buttonText='Open Calories Burned'
                    />

                </div>

            </div>
        </div>
    );
}

export default Home;
