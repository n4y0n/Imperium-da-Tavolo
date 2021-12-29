import { useSelector } from 'react-redux'
import { getHeroImage, getHeroSkill, getHeroItem } from '../core/assets'
import Card, { CardBody, CardText, CardTitle } from './Card'

export default function ({ player }) {
    const hero = useSelector(state => state.game[player].hero)
    if (!hero) return null

    return (
        <Card>
            <div className='flex justify-center items-center'>
                <img src={getHeroImage(hero.image)} />
            </div>
            <CardBody>
                <CardTitle>
                    <h2 className='font-bold text-xl'>{hero.name} [LV{hero.level}]</h2>
                </CardTitle>
                <CardText>
                    <div className='flex flex-col justify-center'>
                        <p>HP: {hero.hp.toFixed(2)}</p>
                        <p>ATK: {hero.atk.toFixed(2)}</p>
                        <p>DEF: {hero.def.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className='mt-8'>
                        <div>
                            <h2>Skills</h2>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(25px,1fr))] gap-3 m-2">
                                {hero.skills.map(id => getHeroSkill(id)).map((skill) => <img className='cursor-pointer' title={skill.description} key={skill.id + hero.id} src={skill.img} alt={skill.name} />)}
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h2>Items</h2>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(25px,1fr))] gap-3 m-2">
                                {hero.items.map(id => getHeroItem(id)).map((item) => <img className='cursor-pointer' title={item.description} key={item.id + hero.id} src={item.img} alt={item.name} />)}
                            </div>
                        </div>
                    </div>
                </CardText>
            </CardBody>
        </Card>
    )
}