import { IntegrationTechnologies } from "../models";
import { catchAsync } from "../utils/catchAsync";

export const getTechnologies = catchAsync(async (req, res) => {
  const technologies = await IntegrationTechnologies.findAll();

  res.status(200).json(technologies);
});

export const createTechnology = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  const technology = await IntegrationTechnologies.create({
    name,
    description,
  });

  res.status(201).json(technology);
});
