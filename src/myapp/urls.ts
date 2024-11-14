import { path } from '@alexi/web/urls';
import { AssetsAPIView, MyAppView } from 'myapp/views.ts';

export const urlpatterns = [
  path('', MyAppView.asView(), 'home'),
  path('assets/', MyAppView.asView(), 'assets'),
  path('api/v1/assets/', AssetsAPIView.asView(), 'api-v1-assets'),
  path('api/v1/assets/:assetId/', AssetsAPIView.asView(), 'api-v1-asset'),
];
