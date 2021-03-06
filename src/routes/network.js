import { Router } from "express"
import {__DEV__} from "../config";
import * as client from "../lib";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserOverview:
 *       type: object
 *       properties:
 *         balance:
 *           $ref: '#/components/schemas/Amount'
 *         frozenBalance:
 *           $ref: '#/components/schemas/Amount'
 *         given:
 *           $ref: '#/components/schemas/Amount'
 *         leftGiven:
 *           $ref: '#/components/schemas/Amount'
 *         leftReceived:
 *           $ref: '#/components/schemas/Amount'
 *         received:
 *           $ref: '#/components/schemas/Amount'
 *     NetworkRequest:
 *       type: object
 *       properties:
 *          networkAddress:
 *            type: string
 *            example: 0x...
 *          userAddress:
 *            type: string
 *            example: 0x...
 *     NetworkDetails:
 *       type: object
 *       properties:
 *         abbreviation:
 *           type: string
 *           example: MMK
 *         address:
 *           type: string
 *           example: 0x...
 *         customInterests:
 *           type: boolean
 *           example: true
 *         decimals:
 *           type: integer
 *           example: 2
 *         defaultInterestRate:
 *           $ref: '#/components/schemas/Amount'
 *         interestRateDecimals:
 *           type: integer
 *           example: 2
 *         isFrozen:
 *           type: boolean
 *           example: false
 *         name:
 *           type: string
 *           example: Burmese Myanmar Kyat
 *         numUsers:
 *           type: number
 *           example: 1000
 *         preventMediatorInterests:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /network:
 *   get:
 *     summary: Get all currency networks.
 *     description: Get all currency networks. 
 *     responses:
 *       200:
 *         description: Return arrary of currency networks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NetworkDetails'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (_req, res, next) => {
  try {
    const response = await client.getAllNetworks();
    res.send(response);
  } catch(err) {
    next(err)
  }
});

/**
 * @swagger
 * /network/user:
 *   post:
 *     summary: Get user overview of specific currency network.
 *     description: Get user overview of specific currecny network. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NetworkRequest'
 *     responses:
 *       200:
 *         description: Return user overview.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserOverview'
 *       500:
 *         description: Internal server error
 */
router.post("/user", async (req, res, next) => {
  const networkAddress = req.body.networkAddress;
  const userAddress = req.body.userAddress;

  try {
    const response = await client.getNetworkUserData(networkAddress, userAddress);
    res.send(response);
  } catch(err) {
    next(err)
  }
});

export default router;
