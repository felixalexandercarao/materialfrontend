import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};
  // This is for Notifications
  notifications: Object[] = [
    {
      round: 'round-success',
      icon: 'ti-calendar',
      title: 'wow',
      subject: 'Hirap mag layout',
      time: '3:57 PM'
    },
    {
      round: 'round-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      round: 'round-primary',
      icon: 'ti-user',
      title: 'Gerald Anderson',
      subject: 'You are my inspiration',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Gerald Anderson',
      subject: "Youre the best",
      time: '9:30 AM'
    },
    {
      useravatar: 'https://media.licdn.com/dms/image/C4E03AQGn9BzvKcPDcg/profile-displayphoto-shrink_200_200/0?e=1569456000&v=beta&t=mk0FOOgB-EtgT8WFnFFDo59FYBdtHYqnv5MMYGeiUzU',
      status: 'busy',
      from: 'Aaron Custodio',
      subject: 'Ano pattern sa 4x4',
      time: '9:10 AM'
    },
    {
      useravatar: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTIwNjA4NjMzNzYwMjg2MjIw/nicolas-cage-9234498-1-402.jpg',
      status: 'away',
      from: 'Nicolas Cage',
      subject: 'Look at this graph  ',
      time: '9:08 AM'
    },
  ];
}
