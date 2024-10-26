import { path } from '@alexi/web/urls.ts';
import { AssetsAPIView, AssetsView, CounterView } from 'myapp/views.ts';

export const urlpatterns = [
  path('', CounterView.asView(), 'counter'),
  path('assets/', AssetsView.asView(), 'assets'),
  path('api/v1/assets/', AssetsAPIView.asView(), 'api-v1-assets'),
  path('api/v1/assets/:assetId/', AssetsAPIView.asView(), 'api-v1-asset'),
];
