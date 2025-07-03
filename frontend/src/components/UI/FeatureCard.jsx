// components/UI/FeatureCard.jsx
'use client';

const FeatureCard = ({ 
  title,
  description,
  icon,
  children, 
  active = false, 
  onClick, 
  color = 'from-blue-500 to-cyan-500',
  className = '',
  cardClassName = '',
  gradient = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={cardClassName ? `relative rounded-2xl p-8 flex flex-col items-center text-center h-full ${cardClassName}` : `relative rounded-2xl p-8 bg-gradient-to-br ${gradient || color} shadow-lg flex flex-col items-center text-center h-full ${className}`}
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-neutral-300 text-base">{description}</p>
      {children}
    </div>
  );
};

export default FeatureCard;