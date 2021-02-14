import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { ITemplateData } from '../models/template-data';
import { GetTemplateService } from '../service/get-template.service';
import { UpdateTemplate } from '../store/actions/data.actions';
import { IAppState } from '../store/state/app.state';

@Component({
  selector: 'app-redirect-template',
  templateUrl: './redirect-template.component.html',
  styleUrls: ['./redirect-template.component.css']
})
export class RedirectTemplateComponent implements OnInit {
  orginalTemplate: ITemplateData = {
    template_id: '',
    to: [],
    from: '',
    subject: '',
    body: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>,
    private getTemp: GetTemplateService
  ) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');

    this.getTemp.getTemplate(id)
      .subscribe((resp: ITemplateData) => {
        console.log("What", resp);
        this.orginalTemplate = resp;

        console.log("HERE", this.orginalTemplate);
        var newTemplate: ITemplateData = {
          ...this.orginalTemplate,
          template_id: this.getUUID()
        }

        this.store.dispatch(new UpdateTemplate(
          newTemplate
        ));

        this.router.navigate(["/template", newTemplate.template_id]);
      })    

    // console.log("Start Navigating")
    // this.router.navigate(["/template", newTemplate.template_id]);
  }

  getUUID(): string {
    return uuidv4();
  }

}
