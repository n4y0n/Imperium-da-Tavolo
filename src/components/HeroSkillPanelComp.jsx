import { useDispatch } from 'react-redux';
import heroskills from "../assets/heroskills";
import { getHeroSkillImage } from "../core/assets";
import { toggleHeroSkill } from '../store/game'

export default function HeroSkillPanel({ player, hero }) {
    const dispatch = useDispatch()
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(25px,1fr))] gap-3 m-2">
            {Object.entries(heroskills).sort(([a, b], [c, d]) => b.name <= d.name ? -1 : 1).map(([name, skill]) => <img className='cursor-pointer' title={skill.description} key={skill.id + hero.id} onClick={() => dispatch(toggleHeroSkill({ player, skill }))} src={getHeroSkillImage(name)} alt={skill.name} />)}
        </div>
    )
}