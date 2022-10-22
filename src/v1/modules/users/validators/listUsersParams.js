import { celebrate, Joi, Segments } from "celebrate";

export default celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required(),
    email: Joi.string().email(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    isLogin: Joi.boolean(),
  }),
});
