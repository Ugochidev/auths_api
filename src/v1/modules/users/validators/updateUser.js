import { celebrate, Segments, Joi } from "celebrate";

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().max(50).optional(),
    lastName: Joi.string().max(50).optional(),
    phone: Joi.string().optional(),
    country: Joi.string().max(50).optional(),
    role: Joi.string().max(50).optional(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().min(11).required(),
  }),
});
