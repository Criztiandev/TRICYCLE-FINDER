import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import RiderService from "../services/rider.service";
import { IAccount } from "../interface/accounter.interface";

class RiderController {
  private service: RiderService;
  constructor() {
    this.service = new RiderService();
  }

  fetchAllRider = expressAsyncHandler(async (req: Request, res: Response) => {
    const credentials = await this.service.getAllRider();

    res.status(200).json({
      payload: credentials,
      message: "Fetched Successfully",
    });
  });

  fetchAllRiderByStatus = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID } = req.user;
      const { status } = req.params;

      let credentials: IAccount[];

      switch (status) {
        case "active":
          credentials = await this.service.getAllRiderActive(UID);
          break;

        case "inactive":
          credentials = await this.service.getAllRiderInactive(UID);
          break;

        default:
          credentials = [];
          break;
      }

      res.status(200).json({
        payload: credentials,
        message: "Fetched Successfully",
      });
    }
  );
}

export default new RiderController();
