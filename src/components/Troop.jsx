export default function ({ troop }) {
    return (
        <span>{troop.name.split('_').join(' ')}</span>
    )
}