import {AfterContentInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {QueryService} from '../../../services/query.service';

export interface BestUsers {
  userid: number;
  email: string;
  firstname: string;
  lastname: string;
  total: number;
}

@Component({
  selector: 'app-charts-users',
  templateUrl: './best-users.component.html',
  styleUrls: ['./best-users.component.css'],
  providers: [QueryService]
})
export class BestUsersComponent implements OnInit, AfterContentInit {
  @Input() option: string;
  public users: BestUsers[] = [];
  public displayedColumns = ['userid' , 'email' , 'firstname' , 'lastname' , 'total'];
  public dataSource: any ;
  @ViewChild('paging') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private queryPro: QueryService) {}

  ngOnInit(): void {
    console.log("ngOnInit - Best Users report - " + this.option);
    this.getReportBy(this.option);
  }
  ngAfterContentInit(): void {
    console.log("ngAfterContentInit - Best Users report" + this.option);
  }
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  public getReportBy(s: string) {
    this.queryPro.getBestUsers(s).subscribe(
      userArr => {
        console.log(userArr);
        userArr.forEach( user => {
          this.users.push(user);
        });
        this.dataSource = new MatTableDataSource<BestUsers>(this.users);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
  }
}
