import { celebrate, Joi, Segments } from "celebrate";

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    tempId: Joi.string().guid().required(),
    otp: Joi.number().required().min(100000).max(999999),
  }),
});
