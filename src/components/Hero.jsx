import { useSelector } from 'react-redux'
import { getHeroImage, getHeroSkill, getHeroSkillImage } from '../core/assets'

function HeroInfo({ hero }) {
    return (
        <div className='flex gap-1'>
            <div className='flex gap-1 flex-shrink-0'>
                <div className='flex items-center'>
                    <img src={getHeroImage(hero.image)} className='w-36' />
                </div>
                <div className='flex flex-col justify-center'>
                    <h2 className='font-bold text-xl'>{hero.name} [LV{hero.level}]</h2>
                    <p>HP: {hero.hp.toFixed(2)}</p>
                    <p>ATK: {hero.atk.toFixed(2)}</p>
                    <p>DEF: {hero.def.toFixed(2)}</p>
                </div>
            </div>
            <div className='overflow-y-scroll'>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(25px,1fr))] gap-3 m-2">
                    {hero.skills.map(id => getHeroSkill(id)).map((skill) => <img className='cursor-pointer' title={skill.description} key={skill.id + hero.id} src={getHeroSkillImage(skill.id)} alt={skill.name} />)}
                </div>
            </div>
        </div>
    )
}

export default function({ player, children }) {
    const hero = useSelector(state => state.game[player].hero)
    return (
        <section className='grid grid-cols-2 items-center my-4'>
            <div className='border-2  min-h-full m-2 flex items-center'>
                <HeroInfo hero={hero} />
            </div>
            <div className='border-2  min-h-full m-2 flex items-center'>
                {children}
            </div>
        </section>
    )
}
