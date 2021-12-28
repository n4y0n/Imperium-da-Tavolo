import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import heroitems from "../assets/heroitems";
import { getHeroItemImage } from "../core/assets";
import { toggleHeroItem } from '../store/game'

export default function({ player }) {
    const dispatch = useDispatch()
    const hero = useSelector(state => state.game[player].hero)
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(25px,1fr))] gap-3 m-2">
            {Object.entries(heroitems).sort(([a, b], [c, d]) => b.name <= d.name ? -1 : 1).map(([name, item]) => <img className='cursor-pointer' title={item.description} key={item.id + hero.id} onClick={() => dispatch(toggleHeroItem({ player, item }))} src={getHeroItemImage(name)} alt={item.name} />)}
        </div>
    )
}