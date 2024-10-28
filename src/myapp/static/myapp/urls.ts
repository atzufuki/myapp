import { path } from '@alexi/pwa/urls.ts';
import { AssetsView, CounterView } from '$myapp/views.ts';

export const urlpatterns = [
  path('', CounterView.asView(), 'counter'),
  path('assets/', AssetsView.asView(), 'assets'),
];
