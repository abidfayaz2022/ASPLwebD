import express from 'express';

import passport from 'passport';
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyDashboard,
  addDirector,
  updateDirector,
  deleteDirector,
  addShareholder,
  updateShareholder,
  deleteShareholder,
  addCompanyService,
  removeCompanyService,
  toggleCompanyEditPermissions
} from '../controllers/companyController.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { Roles } from '../constants/roles.js';

const router = express.Router();



router.use(passport.authenticate('jwt', { session: false }));

router.get('/', checkRole([Roles.ADMIN, Roles.PREPARER]), getAllCompanies);
router.get('/:companyId', getCompanyById);
router.post('/', checkRole([Roles.ADMIN, Roles.PREPARER]), createCompany);
router.put('/:companyId', checkRole([Roles.ADMIN, Roles.PREPARER]), updateCompany);
router.delete('/:companyId', checkRole([Roles.ADMIN]), deleteCompany);

router.get('/:companyId/dashboard', getCompanyDashboard);

router.post('/:companyId/directors', checkRole([Roles.ADMIN, Roles.PREPARER]), addDirector);
router.put('/:companyId/directors/:directorId', checkRole([Roles.ADMIN, Roles.PREPARER]), updateDirector);
router.delete('/:companyId/directors/:directorId', checkRole([Roles.ADMIN, Roles.PREPARER]), deleteDirector);

router.post('/:companyId/shareholders', checkRole([Roles.ADMIN, Roles.PREPARER]), addShareholder);
router.put('/:companyId/shareholders/:shareholderId', checkRole([Roles.ADMIN, Roles.PREPARER]), updateShareholder);
router.delete('/:companyId/shareholders/:shareholderId', checkRole([Roles.ADMIN, Roles.PREPARER]), deleteShareholder);

router.post('/:companyId/services/:serviceId', checkRole([Roles.ADMIN]), addCompanyService);
router.delete('/:companyId/services/:serviceId', checkRole([Roles.ADMIN]), removeCompanyService);

router.put('/company/:id/edit-flags', checkRole([Roles.ADMIN]), toggleCompanyEditPermissions);

export default router;
