import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class DashboardComponent {
  referralCode:string='';
  
  constructor(private route:ActivatedRoute,private userService:UserService){
    this.userService.getReferralCode(sessionStorage.getItem('email'))
    .subscribe((data):any=>{
       this.referralCode=data;
       sessionStorage.setItem('referralCode',data);
    }
    );
  }
  ngOnInit(){
      //Use the parameter value as needed
    };

    getTotalReferrals(){
      this.userService.getReferralCount(this.referralCode)
      .subscribe((data):any=>{
         console.log(data);
      }
      );
    }
  
}
