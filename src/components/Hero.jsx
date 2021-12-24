import { getHeroImage } from '../core/assets'
import HeroSkillPanel from './HeroSkillPanelComp'

function HeroInfo({ hero }) {
    return (
        <div className='flex gap-3 p-2 min-h-full max-w-full'>
            <div>
                <img src={getHeroImage(hero.image)} className='w-36' />
            </div>
            <div>
                <h2 className='font-bold text-xl'>{hero.name} [LV{hero.level}]</h2>
                <p>HP: {hero.hp.toFixed(2)}</p>
                <p>ATK: {hero.atk.toFixed(2)}</p>
                <p>DEF: {hero.def.toFixed(2)}</p>
            </div>
        </div>
    )
}

function HeroComp({ hero, player }) {
    return (
        <section className='grid grid-cols-2 items-center my-4'>
            <div className='border-2 max-w-full max-h-full min-h-full m-2'>
                <HeroInfo hero={hero} />
            </div>
            <div className='border-2 max-w-full max-h-full min-h-full m-2'>
                <HeroSkillPanel player={player} hero={hero} />
            </div>
        </section>
    )
}

export default HeroComp
