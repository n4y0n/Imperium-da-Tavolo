import { useSelector } from 'react-redux'
import { getHeroImage, getHeroSkill, getHeroItem } from '../core/assets'

function HeroInfo({ hero, children }) {
    return (
        <div className='flex items-center'>
            <div className='flex gap-3 flex-shrink-0'>
                <div className='flex items-center'>
                    <img src={getHeroImage(hero.image)} className='w-28' />
                </div>
                <div className='flex flex-col justify-center'>
                    <h2 className='font-bold text-xl'>{hero.name} [LV{hero.level}]</h2>
                    <p>HP: {hero.hp.toFixed(2)}</p>
                    <p>ATK: {hero.atk.toFixed(2)}</p>
                    <p>DEF: {hero.def.toFixed(2)}</p>
                </div>
            </div>
            <div className='h-full'>
                {children}
            </div>
        </div>
    )
}

export default function ({ player }) {
    const hero = useSelector(state => state.game[player].hero)
    if (!hero) return null

    return (
        <div className='border-2 gap-4 min-h-full m-2 flex items-center'>
            <HeroInfo hero={hero}>
                <div className='flex gap-5 overflow-x-hidden'>
                    <div className="overflow-y-scroll">
                        <h2>Skills</h2>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(25px,1fr))] gap-3 m-2">
                            {hero.skills.map(id => getHeroSkill(id)).map((skill) => <img className='cursor-pointer' title={skill.description} key={skill.id + hero.id} src={skill.img} alt={skill.name} />)}
                        </div>
                    </div>
                    <div className="overflow-y-scroll">
                        <h2>Items</h2>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(25px,1fr))] gap-3 m-2">
                            {hero.items.map(id => getHeroItem(id)).map((item) => <img className='cursor-pointer' title={item.description} key={item.id + hero.id} src={item.img} alt={item.name} />)}
                        </div>
                    </div>
                </div>
            </HeroInfo>
        </div>
    )
}
