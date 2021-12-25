import { useDispatch, useSelector } from 'react-redux';
import heroskills from "../assets/heroskills";
import { getHeroSkillImage } from "../core/assets";

export default function HeroSkillPanel({ player, hero }) {
    const dispatch = useDispatch()

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-3 p-2">
            {Object.entries(heroskills).sort(([a, b], [c, d]) => b.name <= d.name ? -1 : 1).map(([name, skill]) => <img className='cursor-pointer' title={skill.description} key={skill.id + hero.id} src={getHeroSkillImage(name)} alt={skill.name} />)}
        </div>
    )
}