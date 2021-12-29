const style = {
    card: `relative flex flex-col border-2 border-gray-200 rounded-lg`,
    cardBody: `block flex-grow flex-shrink p-5`,
    cardTitle: `font-medium text-gray-700 mb-3`,
    cardText: `text-gray-500`,
};

const inlineStyle = {
    boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
};

export default function Card({ children }) {
    return (
        <div className={style.card} style={inlineStyle}>
            {children}
        </div>
    );
}

export function CardBody({ children }) {
    return <div className={style.cardBody}>{children}</div>;
}

export function CardTitle({ children }) {
    return <div className={style.cardTitle}>{children}</div>;
}

export function CardText({ children }) {
    return <div className={style.cardText}>{children}</div>;
}