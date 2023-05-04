import { test, expect, describe } from 'vitest'
import { removeInProgressNetwork, execute } from '../src/modules/exec_run'



describe('removeInProgressNetwork', () => {
    test("if Network name doesn't exist the function will return undefined", async () => {
        expect(removeInProgressNetwork('')).toBe(undefined);

    })
})
