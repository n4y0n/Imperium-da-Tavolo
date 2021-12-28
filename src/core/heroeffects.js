import { stages } from "./utils"

const esempioEffetto = {
    cost: 1,
    apply: function ({ self, other, logs, selfPlayer, iteration }) {
    }
}

const effects = {
	active: {
		cost: cost.active,
		[stages.BEFORE_DAMAGE]: ({ self, other, logs }) => {
			self.recoverAmount = 2;
			return true
		}
	},
}

export default effects